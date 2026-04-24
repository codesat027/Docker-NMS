import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  Shield,
  Zap,
  BarChart3,
  Bell,
  Server,
  Globe,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";

const features = [
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    description:
      "Monitor your entire network infrastructure in real-time with live dashboards and instant status updates.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description:
      "Receive intelligent notifications based on severity levels. Never miss a critical network event again.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Generate comprehensive reports and gain insights into network performance, uptime, and trends.",
  },
  {
    icon: Shield,
    title: "Threshold Management",
    description:
      "Set custom thresholds for CPU, memory, bandwidth, and more. Get alerted before issues escalate.",
  },
  {
    icon: Globe,
    title: "Auto Discovery",
    description:
      "Automatically discover and map network devices. Keep your inventory up-to-date effortlessly.",
  },
  {
    icon: Zap,
    title: "Fast Response",
    description:
      "Identify and respond to outages within seconds. Minimize downtime with rapid incident detection.",
  },
];

export function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex flex-col items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-removebg-preview-G9LnEIp9A9KQUKnV78k4irWEyPZuoE.png"
                alt="Pulse Monitor Logo"
                className="h-10 w-10 object-contain"
              />
              <span className="text-sm font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent leading-tight">
                Pulse Monitor
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                Features
              </a>
              <a href="#about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
                About
              </a>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col gap-4">
                <a href="#features" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  Features
                </a>
                <a href="#about" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                  About
                </a>
                <div className="flex flex-col gap-2 pt-4 border-t border-gray-200">
                  <Link to="/login" className="px-4 py-2 text-sm font-medium text-center text-gray-700 hover:text-gray-900">
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 text-cyan-700 text-sm font-medium mb-6">
              <Activity className="h-4 w-4" />
              Network Management System
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight text-balance">
              Monitor Your Network
              <span className="block bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Like Never Before
              </span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto text-pretty">
              Pulse Monitor provides real-time visibility into your entire network infrastructure. 
              Detect issues before they impact your business.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/register"
                className="flex items-center gap-2 px-6 py-3 text-base font-medium text-white bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
              >
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-2 px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all shadow-sm"
              >
                View Demo
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Powerful Features
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Everything you need to keep your network running smoothly
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:border-cyan-200 hover:shadow-lg transition-all group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 text-white mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Intuitive Dashboard
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              Get a complete overview of your network at a glance
            </p>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
            <div className="p-4 bg-gray-100 border-b border-gray-200 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <span className="ml-4 text-sm text-gray-500">dashboard.pulsemonitor.io</span>
            </div>
            <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800">
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Total Nodes", value: "156", color: "from-cyan-500 to-blue-500" },
                  { label: "Active Alarms", value: "12", color: "from-red-500 to-orange-500" },
                  { label: "Uptime", value: "99.8%", color: "from-green-500 to-emerald-500" },
                  { label: "Bandwidth", value: "2.4TB", color: "from-purple-500 to-pink-500" },
                ].map((item) => (
                  <div key={item.label} className="p-4 rounded-xl bg-gray-800/50 border border-gray-700">
                    <div className="text-xs text-gray-400 mb-1">{item.label}</div>
                    <div className={`text-2xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-40 rounded-xl bg-gray-800/50 border border-gray-700 flex items-center justify-center">
                <div className="flex items-end gap-2 h-24">
                  {[40, 65, 45, 80, 55, 70, 90, 60, 75, 50, 85, 95].map((h, i) => (
                    <div
                      key={i}
                      className="w-6 bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t"
                      style={{ height: `${h}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-gradient-to-r from-cyan-600 to-blue-600 p-12 text-center shadow-2xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Monitor Your Network?
            </h2>
            <p className="text-lg text-cyan-100 mb-8 max-w-2xl mx-auto">
              Start your free trial today. No credit card required.
            </p>
            <Link
              to="/register"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-cyan-600 bg-white rounded-lg hover:bg-cyan-50 transition-all shadow-lg"
            >
              Start Free Trial
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-gray-400">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-removebg-preview-G9LnEIp9A9KQUKnV78k4irWEyPZuoE.png"
                alt="Pulse Monitor Logo"
                className="h-8 w-8 object-contain"
              />
              <span className="text-lg font-semibold text-white">Pulse Monitor</span>
            </div>
            <div className="flex items-center gap-8 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
            <div className="text-sm">
              &copy; {new Date().getFullYear()} Pulse Monitor. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
