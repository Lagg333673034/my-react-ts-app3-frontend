//export const urlToAPIBackend_first = "http://localhost:5000/api"
//export const urlToFrontend = "http://localhost:3000";
export const urlToAPIBackend_first = "https://my-react-ts-app3-backend.onrender.com/api"
export const urlToFrontend = "https://lagg333673034-my-test-app.netlify.app";


export function getCurrentDataTime() {
    let datetime = new Date();
    let year = datetime.getFullYear();
    let month = datetime.getMonth() + 1;
    let day = datetime.getDate();
    let hour = datetime.getHours();
    let minute = datetime.getMinutes();
    let second = datetime.getSeconds();

    let m = month.toString().padStart(2, '0');
    let d = day.toString().padStart(2, '0');
    let h = hour.toString().padStart(2, '0');
    let min = minute.toString().padStart(2, '0');
    let sec = second.toString().padStart(2, '0');

    //return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    return `${year}-${m}-${d} ${h}:${min}:${sec}`;
}