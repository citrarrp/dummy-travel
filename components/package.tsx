import React from 'react';

const transportationData = [
  { id_package: 1, id_transportasi: 101, urutan_rute: 1, id_transportPackage: 1 },
  { id_package: 1, id_transportasi: 123, urutan_rute: 2, id_transportPackage: 2 },
  { id_package: 2, id_transportasi: 151, urutan_rute: 1, id_transportPackage: 3 },
  { id_package: 2, id_transportasi: 102, urutan_rute: 2, id_transportPackage: 4 },
  { id_package: 3, id_transportasi: 78, urutan_rute: 1, id_transportPackage: 5 },
  { id_package: 3, id_transportasi: 105, urutan_rute: 2, id_transportPackage: 6 },
];

// Definisikan tipe untuk objek yang mewakili transportasi detail
type TransportationDetail = {
  id_transportasi: number;
  urutan_rute: number;
};

type GroupedTransportations = {
  [key: number]: TransportationDetail[];
};

const TransportationCards = () => {
  const groupedTransportations: GroupedTransportations = transportationData.reduce((acc, curr) => {
    if (!acc[curr.id_package]) {
      acc[curr.id_package] = [];
    }
    acc[curr.id_package].push({ id_transportasi: curr.id_transportasi, urutan_rute: curr.urutan_rute });
    return acc;
  }, {} as GroupedTransportations);

  return (
    <div className="card-container">
      {Object.entries(groupedTransportations).map(([idPackage, details], index) => (
        <div key={index} className="card">
          <h3>ID Package: {idPackage}</h3>
          <ul>
            {details.map((detail, idx) => (
              <li key={idx}>
                <p>ID Transportasi: {detail.id_transportasi}</p>
                <p>Urutan Rute: {detail.urutan_rute}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default TransportationCards;
