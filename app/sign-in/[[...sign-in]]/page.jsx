'use client'

import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">

      {/* LEFT SIDE — IMAGE */}
      <div
        className="hidden md:flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d)",
        }}
      >
        <div className="bg-black/50 w-full h-full flex items-center justify-center">
          <div className="text-white max-w-md px-8">
            <h1 className="text-4xl font-bold mb-4">
              Welcome to AI Interview Mocker 🚀
            </h1>
            <p className="text-lg opacity-90">
              Practice real interviews.  
              Get AI feedback.  
              Crack your dream job.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE — AUTH */}
      <div className="flex items-center justify-center">
        <SignIn />
      </div>

    </div>
  );
}