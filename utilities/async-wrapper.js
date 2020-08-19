module.exports.AsyncWrapper = function AsyncWrapper(fn) {
     return (req, res, next) => {
        /**
         * any errors that happen inside this function will be caught 
         * and passed to the first error handling middleware that we
         * supply to express
        */
         return fn(req, res).catch(next);
     }
}