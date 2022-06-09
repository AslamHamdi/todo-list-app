import axios from "axios";

class AjaxCall{
    static Post = function(url, data, object, param, forceError = false, successMsg = '', showLoad = true, runFunction = [], saveAll = false, alwaysRunFunction = false){
        let postPromise = null;
        let objR = { inProg: true, isSuccess: false, data: null, source: undefined, promise: undefined }
        try{
            postPromise = axios.post(url, JSON.stringify(data))
                .then(function (response){
                    try{
                        if(!response.data.hasOwnProperty("data")){
                            console.log("Cannot retrieve the data. Seems the url might be wrong. Please contact the developer")
                        }else{
                            objR.isSuccess = true;
                            objR.data = response.data.data
                        }
                    }catch(err){}
                })
        }catch(err){
            console.log("Some error happened when trying to get the data from server")
            console.log(err)
        }
        return response
    }
}

export default AjaxCall