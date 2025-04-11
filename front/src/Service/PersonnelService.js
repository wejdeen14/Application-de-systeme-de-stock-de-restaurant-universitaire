import axios from "axios";
const USER_BASE_REST_API_URL="http://localhost:8080/api/v1/auth";
const USER_BASE_REST_API_URLUSER="http://localhost:8080/api";
const FOURNISSEUR_BASE_API_URL="http://localhost:8080/four";
class PersonnelService {
    getAllUsers(){
        return axios.get(USER_BASE_REST_API_URLUSER)
    }
   
    getUserBy(id){
        return axios.get(USER_BASE_REST_API_URL +'/'+id);
    }
    getUserById(id){
        return axios.get(USER_BASE_REST_API_URLUSER +'/'+id);
    }
    updateUser(id, user){
        return axios.put(`${USER_BASE_REST_API_URL}/update/${id}`, user).then(response => response.data);
    }
    deleteUser(id){
        return axios.delete(`${USER_BASE_REST_API_URLUSER}/${id}`);
    }
getFournisseursWithCategories(){
    return axios.get(`${FOURNISSEUR_BASE_API_URL}/fournisseurs` );
}

}
export default new PersonnelService() ;