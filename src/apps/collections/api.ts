import {NewAPICollection} from "./types";
import {authenticatedInstance} from "../../api";
import {AxiosResponse} from "axios";

const api = {
    create: (ownerUrl: string, data: NewAPICollection): Promise<AxiosResponse<any>> => authenticatedInstance.post(`${ownerUrl}collections/`, data),
    retrieve: (collectionUrl: string): Promise<AxiosResponse<any>> => authenticatedInstance.get(collectionUrl, {params: {verbose: true}}),
};

export default api;