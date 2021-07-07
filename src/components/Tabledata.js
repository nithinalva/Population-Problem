import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';

const Tabledata = ({mapdata}) => {
    return (
<div className="table-data">
<table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">country(From)</th>
      <th scope="col">LatLng(From)</th>
      <th scope="col">country(To)</th>
      <th scope="col">LatLng(to)</th>
      <th scope="col">Distance</th>
      <th scope="col">Total Distance(KM)</th>
    </tr>
  </thead>
  <tbody>

      {mapdata.map((tableData,index)=>(

        <tr key={index}>
      <th scope="row">{index+1}</th>
      <td>{tableData.from}</td>
      <td>[{tableData.latlngfrom[0]},{tableData.latlngfrom[1]}]</td>
      <td>{tableData.to}</td>
      <td>[{tableData.latlongTo[0]},{tableData.latlongTo[1]}]</td>
      <td>{tableData.distance}</td>
      <td>{tableData.total} KM</td>
    </tr>

      )
      )}
    
  </tbody>
</table>

</div>

    )
}

export default Tabledata
