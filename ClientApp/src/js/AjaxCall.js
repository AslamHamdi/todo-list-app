import * as __functionCustom from '/ClientApp/src/js/FunctionCustom.js';

export default class AjaxCall{
    static Post = function(url, data){
        let postPromise = null;
        let objR = { inProg: true, isSuccess: false, data: null, source: undefined, promise: undefined }
        try{
            postPromise = axios.post(url, JSON.stringify(data), {
            }).then(function (response){
                console.log("RESPONS AJAX CALL: ", response)
            })
        }catch(err){
            __functionCustom.showWarnMessage("Some error happened when trying to get the data from server")
            //console.log("Some error happened when trying to get the data from server")
            console.log(err)
        }
        return objR
    }

    static Get = function(msg) {
        __functionCustom.showSuccessMessage("AJAX CALL")
    }
}