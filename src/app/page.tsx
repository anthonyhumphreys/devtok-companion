import Link from "next/link";
import { Code2, Smartphone, BarChart3, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="container mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Code2 className="h-8 w-8 text-purple-400" />
          <span className="text-2xl font-bold text-white">
            DevTok Companion
          </span>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link
            href="#features"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Features
          </Link>
          <Link
            href="#pricing"
            className="text-gray-300 hover:text-white transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/dashboard"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Dashboard
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Share Code Snippets
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
            Beyond TikTok
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Stop losing viewers who can't read your code in videos. Create
          beautiful, shareable snippet pages that complement your TikTok content
          and keep your audience engaged.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Start Free Trial
          </Link>
          <Link
            href="#demo"
            className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            See Demo
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Everything You Need to Level Up Your Dev Content
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <Code2 className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Code Snippet Hosting
            </h3>
            <p className="text-gray-300">
              Upload code with syntax highlighting, easy copying, and
              mobile-optimized viewing.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <Smartphone className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Mobile First
            </h3>
            <p className="text-gray-300">
              Perfect viewing experience for TikTok users browsing on mobile
              devices.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <BarChart3 className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Analytics Dashboard
            </h3>
            <p className="text-gray-300">
              Track views, engagement, and see which content resonates most with
              your audience.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <Zap className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              Quick Integration
            </h3>
            <p className="text-gray-300">
              Generate QR codes and short links to seamlessly connect your
              TikTok to your code.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            See It In Action
          </h2>
          <p className="text-xl text-gray-300">
            Here's how your code snippets will look to your TikTok audience
          </p>
        </div>

        <div className="max-w-md mx-auto">
          {/* Mobile mockup */}
          <div className="bg-slate-800 rounded-3xl p-4 border-4 border-slate-700 shadow-2xl">
            <div className="bg-slate-900 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <Code2 className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">@devtok_creator</h3>
                  <p className="text-gray-400 text-sm">React useState Hook</p>
                </div>
              </div>

              <div className="bg-slate-800 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">javascript</span>
                  <button className="text-purple-400 text-sm hover:text-purple-300">
                    Copy
                  </button>
                </div>
                <code className="text-green-400 text-sm block font-mono">
                  {`const [count, setCount] = useState(0);`}
                  <br />
                  {`const increment = () => setCount(count + 1);`}
                </code>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>👀 42 views</span>
                <Link href="#" className="text-pink-400 hover:text-pink-300">
                  Watch on TikTok →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-16">
          Simple, Transparent Pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Free Tier */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-2">Free</h3>
            <p className="text-gray-300 mb-6">Perfect for getting started</p>
            <div className="text-3xl font-bold text-white mb-6">
              $0<span className="text-lg text-gray-300">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="text-gray-300">✓ 5 code snippets</li>
              <li className="text-gray-300">✓ Basic analytics</li>
              <li className="text-gray-300">✓ Mobile-optimized pages</li>
              <li className="text-gray-300">✓ QR code generation</li>
            </ul>
            <Link
              href="/dashboard"
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold text-center block transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="bg-gradient-to-b from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-xl p-8 border-2 border-purple-400 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Pro</h3>
            <p className="text-gray-300 mb-6">For serious content creators</p>
            <div className="text-3xl font-bold text-white mb-6">
              $12<span className="text-lg text-gray-300">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="text-gray-300">✓ Unlimited snippets</li>
              <li className="text-gray-300">✓ Advanced analytics</li>
              <li className="text-gray-300">✓ Custom branding</li>
              <li className="text-gray-300">✓ Custom domains</li>
              <li className="text-gray-300">✓ Priority support</li>
            </ul>
            <Link
              href="/dashboard"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold text-center block transition-colors"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Team Tier */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-2">Team</h3>
            <p className="text-gray-300 mb-6">For organizations and agencies</p>
            <div className="text-3xl font-bold text-white mb-6">
              $49<span className="text-lg text-gray-300">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="text-gray-300">✓ Everything in Pro</li>
              <li className="text-gray-300">✓ Team collaboration</li>
              <li className="text-gray-300">✓ White-label options</li>
              <li className="text-gray-300">✓ API access</li>
              <li className="text-gray-300">✓ Dedicated support</li>
            </ul>
            <Link
              href="/contact"
              className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-semibold text-center block transition-colors"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 mt-20">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Code2 className="h-6 w-6 text-purple-400" />
              <span className="text-lg font-semibold text-white">
                DevTok Companion
              </span>
            </div>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/contact"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="text-center text-gray-400 mt-8">
            © 2025 DevTok Companion. Built for developer creators.
          </div>
        </div>
      </footer>
    </div>
  );
}
