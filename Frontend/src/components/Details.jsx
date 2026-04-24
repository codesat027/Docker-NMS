// 



import  { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../api/opennms";  // your new api helper

const Details = () => {
  const [status, setStatus]         = useState("Connecting...");
  const [serverInfo, setServerInfo] = useState(null);
  const [nodes, setNodes]           = useState([]);

  useEffect(() => {
    const initialize = async () => {
      try {
        // 1. Health check — replaces client.connect()
        const health = await api.get("/health/")
        setStatus("✅ Connected Successfully!")
        setServerInfo({
          version:    health.version    || "Connected",
          instanceId: health.instanceId || "Pulse Monitor",
        })

        // 2. Fetch nodes — replaces client.nodes().find()
        const nodesData = await api.get("/nodes/")
        const list = nodesData?.node ?? nodesData ?? []
        setNodes(list)

      } catch (err) {
        console.error("Connection Error:", err)
        setStatus(`❌ Connection Failed: ${err.message || "Check Console"}`)
      }
    }

    initialize()
  }, [])

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4 gap-6 text-center">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        OpenNMS Connection Test
      </h1>

      <Link to="/alarms">Go to Alarms</Link>

      <p className="text-lg text-gray-600 dark:text-gray-300">
        <strong className="font-semibold">Status:</strong> {status}
      </p>

      {serverInfo && (
        <div className="p-6 border-2 border-red-500 rounded-xl bg-white dark:bg-gray-800 shadow-sm max-w-md w-full">
          <h3 className="text-xl font-semibold mb-2 text-red-600">Server Details</h3>
          <div className="text-left space-y-1">
            <p><strong>Version:</strong>     {serverInfo.version}</p>
            <p><strong>Instance ID:</strong> {serverInfo.instanceId}</p>
          </div>
        </div>
      )}

      <div className="w-full max-w-md">
        <h4 className="text-lg font-medium mb-3">
          Devices Monitored: {nodes.length}
        </h4>
        <ul className="list-none space-y-2">
          {nodes.map((node) => (
            <li
              key={node.id}
              className="p-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 shadow-sm"
            >
              {node.label} —{" "}
              {node.createTime
                ? new Date(node.createTime).toLocaleString()  // ← fixed, was .toLocaleString() on raw value
                : "N/A"}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Details;