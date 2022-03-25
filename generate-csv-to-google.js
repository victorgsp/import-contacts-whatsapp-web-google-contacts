//put your contact marker in next variable (marker)
var contactMarker = "CESAR";

var contacts = "Name,Given Name,Additional Name,Family Name,Yomi Name,Given Name Yomi,Additional Name Yomi,Family Name Yomi,Name Prefix,Name Suffix,Initials,Nickname,Short Name,Maiden Name,Birthday,Gender,Location,Billing Information,Directory Server,Mileage,Occupation,Hobby,Sensitivity,Priority,Subject,Notes,Language,Photo,Group Membership,Phone 1 - Type,Phone 1 - Value\n";

(function () {
  var newscript = document.createElement('script');
  newscript.type = 'text/javascript';
  newscript.async = true;
  newscript.src = 'https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js';
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(newscript);
})();



function downloadFile(filename, data) {
  var blob = new Blob([data], { type: 'text/csv' });
  if (window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveBlob(blob, filename);
  }
  else {
    var elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = filename;
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
}

function generateContactFileToImport() {
  $('div.KPJpj div._3OvU8').each(function (index, item) {
    try {
      let contactPhone = $(item).find('span')[1].innerText;

      let isNumber = contactPhone[0] === '+' ? Number(contactPhone.slice(1, 3)) : Number("returnNaN");

      if (!isNaN(isNumber)) {
        let contactName = $(item).find('span')[3].innerText;
        console.log(contactName + " " + contactPhone);
        if (contactMarker != null && contactMarker != "") {
          contactMarker = " " + contactMarker;
        } else {
          contactMarker = "";
        }

        contacts += `${contactName}${contactMarker},${contactName}${contactMarker},,,,,,,,,,,,,,,,,,,,,,,,,,,* myContacts,Mobile,${contactPhone}\n`;
      }


    } catch (err) {
      console.log(err);
    }

  });
}

function downloadContactFileToImport() {
  generateContactFileToImport();
  downloadFile('contacts.csv', contacts);
}

setTimeout(downloadContactFileToImport, 1000);;