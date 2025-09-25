import AdvisorForm from '../components/AdvisorForm'
import type { FirmEntry } from '../types'

export default function HomePage() {
  const handleFormComplete = (firms: FirmEntry[]) => {
    console.log('Form completed with firms:', firms);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-night-sky-blue-8 to-white flex items-center justify-center">
      <div className="max-w-2xl w-full px-4">
        <div className="space-y-12 text-center">
          {/* Logo Placeholder */}
          <div className="flex items-center justify-center space-x-3">
            <div className="w-8 h-8 bg-dark-blue-0 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="typography-h4 text-night-sky-blue-dark-1 font-semibold">
              definely
            </span>
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-night-sky-blue-dark-1 leading-tight">
              Referral Partners and Contact Details
            </h1>
          </div>

          {/* Form */}
          <div className="max-w-md mx-auto">
            <AdvisorForm onComplete={handleFormComplete} />
          </div>
        </div>
      </div>
    </div>
  )
}