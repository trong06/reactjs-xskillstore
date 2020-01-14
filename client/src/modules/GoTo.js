import React from 'react';

export function SetParamsPage(page = 1) {
    window.history.pushState(`page`, `page`, `?page=${page}`);
}

export function goTo(page, title, url) {
    if("undefinded" !== typeof window.history.pushState) {
        window.history.pushState({page: page}, title, url);
    } else {
        window.location.assign(url);
    }
}