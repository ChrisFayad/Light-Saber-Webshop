const sendXML = (xml, name) => {
  const xhttp = new XMLHttpRequest();
  xhttp.open("POST", "https://localhost:7000/jedisabershop/sabers");
  xhttp.setRequestHeader("Content-Type", "text/xml");
  xhttp.send(xml);
};

module.exports = sendXML;
