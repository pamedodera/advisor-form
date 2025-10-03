import AdvisorForm from '../components/AdvisorForm'
import type { FirmEntry } from '../types'
import DefinitelyLogo from '../assets/definely-logo.svg?react'

export default function HomePage() {
  const handleFormComplete = (firms: FirmEntry[], userEmail: string) => {
    console.log('Form completed with firms:', firms);
    console.log('User email:', userEmail);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8">
      <div className="max-w-2xl w-full px-4">
        <div className="space-y-12 text-center">
          {/* Definely Logo */}
          <div className="flex items-center justify-center">
            <DefinitelyLogo className="h-20 w-auto" />
          </div>

          {/* White Card Container */}
          <div className="bg-white rounded-2xl p-8" style={{ border: '1px solid #eeeeee', boxShadow: 'rgba(0, 0, 0, 0.06) 0px 0.15rem 0.25rem 0px' }}>
            {/* Main Heading */}
            <div className="space-y-3 mb-8">
              <h1 className="text-5xl font-bold text-night-sky-blue-dark-1 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Network Assist Portal
              </h1>
              <div className="text-neutral-1 max-w-xl mx-auto text-lg space-y-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <p>Please indicate the firms where you have strong relationships and would be willing to make an introduction.</p>
                <p>For each firm that matches our prospect list, we'll ask you to share contact details.</p>
              </div>
            </div>

            {/* Form */}
            <div className="max-w-xl mx-auto">
              <AdvisorForm onComplete={handleFormComplete} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}