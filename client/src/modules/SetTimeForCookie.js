import React from 'react';

function SetTimeForCookie(minutes = 60) {
    let date = new Date(); //return date now
    let time = date.getTime(); //return miliseconds

    time += minutes * 60 * 1000

    date.setTime(time);
    return date;
}

export default SetTimeForCookie;