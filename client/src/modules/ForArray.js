import React from 'react';

export const MyArray = {
    JSONParse: (arrayList) => {
        return arrayList.map((arrStringify) => {
            return JSON.parse(arrStringify);
        })
    }
}