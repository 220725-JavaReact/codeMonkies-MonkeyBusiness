export class AppService {


    public async getUser(username:string): Promise<any> {
        const response = await fetch('http://monkeybusiness.us-east-1.elasticbeanstalk.com/user/username?username=' + username);
        return await response.json();
    }

    // public async addUser(user: any) {
    //     const response = await fetch(`/api/user`, {
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json'},
    //         body: JSON.stringify({user})
    //       })
    //     return await response.json();
    // }

}