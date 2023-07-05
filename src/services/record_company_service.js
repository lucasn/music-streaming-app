import { parse } from "dotenv";
import { apiBaseURL } from "../configs/server.js";

export async function createRecordCompany(recordCompany) {
    const response = await fetch(`${apiBaseURL}/record`, {
        method: 'post',
        body: JSON.stringify(recordCompany),
        headers: {'Content-Type': 'application/json'}
    });
}
export async function getRecordCompany(recordCompanyId) {
    const response = await fetch(`${apiBaseURL}/record/${recordCompanyId}`);

    if(response.status === 200) {
        const recordCompany = await response.json();
        return recordCompany;
    }

    return null;
}
export async function getRecordCompanyTopArtists(recordCompanyId) {
    const response = await fetch(`${apiBaseURL}/artist?recordCompanyId=${recordCompanyId}&top=3`);

    if(response.status === 200){
        const topArtists = await response.json();

        return topArtists
    }
}

export async function getRecordCompanyArtists(recordCompanyId){
    const response = await fetch(`${apiBaseURL}/record/${recordCompanyId}/artists`);

    if(response.status === 200){
        const artists = await response.json();
        return artists.artists;
    }
}

export async function searchArtists(artistNameContains) {
    const response = await fetch(`${apiBaseURL}/artists?search=${artistNameContains}`);

    if(response.status === 200){
        const artists = await response.json();
        return artists;
    }
}

export async function addArtist(artistId, recordCompanyId) {
    const response = await fetch(`${apiBaseURL}/record/${recordCompanyId}/artists/add`,{
        method: "POST",
        body: JSON.stringify({artistId}),
        headers: {'Content-Type': 'application/json'}
    });
}

export async function deleteRecordCompany(recordCompanyId) {
    const response = await fetch(`${apiBaseURL}/record/${recordCompanyId}`, {
        method: 'delete'
    });
}