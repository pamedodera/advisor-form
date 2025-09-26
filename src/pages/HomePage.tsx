import AdvisorForm from '../components/AdvisorForm'
import type { FirmEntry } from '../types'
import DefinitelyLogo from '../assets/definely-logo.svg?react'

export default function HomePage() {
  const handleFormComplete = (firms: FirmEntry[], userEmail: string) => {
    console.log('Form completed with firms:', firms);
    console.log('User email:', userEmail);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-night-sky-blue-8 to-white flex items-center justify-center">
      <div className="max-w-2xl w-full px-4">
        <div className="space-y-12 text-center">
          {/* Definely Logo */}
          <div className="flex items-center justify-center">
            <DefinitelyLogo className="h-16 w-auto" />
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold text-night-sky-blue-dark-1 leading-tight">
              Network Assist Portal
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