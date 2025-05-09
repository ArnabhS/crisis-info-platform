import React from "react";

const helplines = [
  {
    state: "Jammu & Kashmir",
    districts: [
      { name: "Jammu", numbers: ["0191-2571912", "0191-2571616"] },
      { name: "Samba", numbers: ["01923-241004", "01923-246915"] },
      { name: "Kathua", numbers: ["01922-238796"] },
      { name: "Poonch", numbers: ["01965-220258", "9086253188"] },
      { name: "Rajouri", numbers: ["01962-260207", "01962-260033"] },
      { name: "Udhampur", numbers: ["01992-270212", "01992-276915"] },
      { name: "Reasi", numbers: ["01991-245587", "01991-245757"] },
      { name: "Ramban", numbers: ["01998-255550", "01998-266790"] },
      { name: "Doda", numbers: ["01996-233530", "01996-234413", "7298923100"] },
      { name: "Kishtwar", numbers: ["01995-259555", "9482217492"] }
    ]
  },
  {
    state: "Rajasthan",
    districts: [
      { name: "Barmer", numbers: ["02982-220007", "9799409229"] },
      { name: "Jaisalmer", numbers: ["02992-252223", "9414136001"] },
      { name: "Jodhpur", numbers: ["0291-2434444", "9414036111"] },
      { name: "Bikaner", numbers: ["0151-2226002", "9414402735"] },
      { name: "Ajmer", numbers: ["0145-2627300", "9413052922"] },
      { name: "Alwar", numbers: ["0144-2701725", "9414017788"] },
      { name: "Banswara", numbers: ["02962-246200", "9460581403"] },
      { name: "Bhilwara", numbers: ["01482-232603", "9660173799"] },
      { name: "Chittorgarh", numbers: ["01472-247997", "7300453344"] }
    ]
  },
  {
    state: "Punjab",
    districts: [
      { name: "Amritsar", numbers: ["0183-2564485"] },
      { name: "Pathankot", numbers: ["0186-2220131"] },
      { name: "Jalandhar", numbers: ["0181-2451466"] },
      { name: "Gurdaspur", numbers: ["01874-240010"] },
      { name: "Chandigarh", numbers: ["0172-2741803", "0172-2749901"] }
    ]
  }
];

const HelplinePage = () => {
  return (
    <div className="min-h-screen bg-gray-800 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">District-wise Emergency Helplines</h1>
      {helplines.map((region, i) => (
        <div key={i} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 border-b border-gray-600 pb-2">{region.state}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {region.districts.map((district, j) => (
              <div key={j} className="bg-gray-700 rounded-lg p-4 shadow-md">
                <h3 className="text-xl font-medium mb-2">{district.name}</h3>
                <ul className="space-y-1">
                  {district.numbers.map((num, k) => (
                    <li key={k}>
                      <a href={`tel:${num}`} className="text-blue-300 hover:text-blue-400">
                        {num}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HelplinePage;
