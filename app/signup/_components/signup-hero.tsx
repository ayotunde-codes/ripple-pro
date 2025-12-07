import Image from "next/image"

export function SignupHero() {
  return (
    <div className="relative hidden w-0 flex-1 lg:block">
      <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-dashboard-purple to-dashboard-pink">
        <div className="flex h-full items-center justify-center">
          <div className="max-w-2xl px-8 text-center text-white">
            <Image
              src="/images/ripple-pro-icon.png"
              alt="RipplePro Icon"
              width={150}
              height={150}
              className="mx-auto mb-8"
            />
            <h1 className="text-4xl font-bold mb-4">Amplify Your Brand</h1>
            <p className="text-xl">Join thousands of brands and creators making waves with RipplePro.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

