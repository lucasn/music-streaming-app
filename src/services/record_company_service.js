import { parse } from "dotenv";
import { apiBaseURL } from "../configs/server.js";

export async function getRecordCompany(recordCompanyId) {
    const response = await fetch(`${apiBaseURL}/record/${recordCompanyId}`);

    if(response.status === 200) {
        const recordCompany = await response.json();
        return recordCompany;
    }

    return null;
}

export async function getRecordCompanyArtists(recordCompanyId){
    const response = await fetch(`${apiBaseURL}/record/${recordCompanyId}/artists`);

    if(response.status === 200){
        const artists = await response.json();
        return artists.artists;
    }
}