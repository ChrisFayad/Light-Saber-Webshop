const sendXML = (xml, name) => {
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "https://localhost:7000/jedisabershop/sabers");
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const res = xhttp.response;
      alert(`${res}: ${name}`);
    }
  };
  xhttp.setRequestHeader("Content-Type", "text/xml");
  xhttp.send(xml);
};

module.exports = sendXML;
