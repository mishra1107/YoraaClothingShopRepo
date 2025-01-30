exports.ApiResponse = (user) => {
    return {
        name: user.name,
        phoneNo: user.phNo,
        token : null || user.token
        
    }
} 