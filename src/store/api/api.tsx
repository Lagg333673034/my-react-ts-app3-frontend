//export const urlToAPIBackend_first = "http://localhost:5000/api"
//export const urlToFrontend = "http://localhost:3000";
export const urlToAPIBackend_first = "https://my-react-ts-app3-backend.onrender.com/api"
export const urlToFrontend = "https://lagg333673034-my-test-app.netlify.app";


export function setCookie(name:string,value:string,days:number) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
export function getCookie(name:string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
export function deleteCookie(name:string) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

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