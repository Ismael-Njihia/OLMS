import React from 'react';

const App = () => {
  return (
    <table className="table-fixed border-2 border-red-900">
      <thead>
        <tr>
          <th className="w-1/4 p-2 font-bold text-center">Column 1</th>
          <th className="w-1/4 p-2 font-bold text-center">Column 2</th>
          <th className="w-1/4 p-2 font-bold text-center">Column 3</th>
          <th className="w-1/4 p-2 font-bold text-center">Column 4</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2 text-center font-bold">Data 1</td>
          <td className="p-2 text-center font-bold">Data 2</td>
          <td className="p-2 text-center font-bold">Data 3</td>
          <td className="p-2 text-center font-bold">Data 4</td>
        </tr>
        <tr>
          <td className="p-2 text-center font-bold">Data 5</td>
          <td className="p-2 text-center font-bold">Data 6</td>
          <td className="p-2 text-center font-bold">Data 7</td>
          <td className="p-2 text-center font-bold">Data 8</td>
        </tr>
        <tr>
          <td className="p-2 text-center font-bold">Data 9</td>
          <td className="p-2 text-center font-bold">Data 10</td>
          <td className="p-2 text-center font-bold">Data 11</td>
          <td className="p-2 text-center font-bold">Data 12</td>
        </tr>
        <tr>
          <td className="p-2 text-center font-bold">Data 13</td>
          <td className="p-2 text-center font-bold">Data 14</td>
          <td className="p-2 text-center font-bold">Data 15</td>
          <td className="p-2 text-center font-bold">Data 16</td>
        </tr>
      </tbody>
    </table>
  );
};

export default App;
