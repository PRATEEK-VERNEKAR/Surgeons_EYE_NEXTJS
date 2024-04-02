import React from 'react';

const Welcome: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-indigo-100 to-purple-100">
      <section className="py-12">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            🚀 Steps to Use our Website
          </h2>
          <ol className="space-y-6">
            <li className="bg-white shadow-lg rounded-lg p-2 border border-indigo-300 transition duration-500 hover:scale-105">
              <h6 className="text-xl font-bold mb-2 flex items-center">
                <span className="mr-2 text-indigo-600">✍️</span> Navigate to the home page
              </h6>
            </li>
            <li className="bg-white shadow-lg rounded-lg p-2 border border-indigo-300 transition duration-500 hover:scale-105">
              <h6 className="text-xl font-bold mb-2 flex items-center">
                <span className="mr-2 text-indigo-600">📝</span> Choose various available chatbots - Cataract, Cholec, etc.
              </h6>
            </li>
            <li className="bg-white shadow-lg rounded-lg p-2 border border-indigo-300 transition duration-500 hover:scale-105">
              <h6 className="text-xl font-bold mb-2 flex items-center">
                <span className="mr-2 text-indigo-600">📝</span> Upload the surgical video of your interest
              </h6>
            </li>
            <li className="bg-white shadow-lg rounded-lg p-2 border border-indigo-300 transition duration-500 hover:scale-105">
              <h6 className="text-xl font-bold mb-2 flex items-center">
                <span className="mr-2 text-indigo-600">📝</span> Interact with our Surgeons
              </h6>
            </li>
          </ol>
        </div>
      </section>

      <section className="py-12 bg-gradient-to-r from-yellow-100 to-orange-100">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600">
            🏗️ System Workflow
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <li className="bg-white shadow-lg rounded-lg p-6 border border-yellow-300 transition duration-500 hover:scale-105">
              <h3 className="text-xl font-bold mb-2 flex items-center">
                <span className="mr-2 text-yellow-600">📐</span> Accurate Phase Analysis
              </h3>
            </li>
            <li className="bg-white shadow-lg rounded-lg p-6 border border-yellow-300 transition duration-500 hover:scale-105">
              <h3 className="text-xl font-bold mb-2 flex items-center">
                <span className="mr-2 text-yellow-600">🛠️</span> Tool and Organ Segmentation
              </h3>
            </li>
            <li className="bg-white shadow-lg rounded-lg p-6 border border-yellow-300 transition duration-500 hover:scale-105">
              <h3 className="text-xl font-bold mb-2 flex items-center">
                <span className="mr-2 text-yellow-600">🛠️</span> Relative Motion of Tools and Organs
              </h3>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Welcome;