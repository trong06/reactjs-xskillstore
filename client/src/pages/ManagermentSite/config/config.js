import React from 'react';

const config = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`
    }
}

export default config;