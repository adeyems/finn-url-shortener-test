class URLService {

    static isValidURL = (string: string): boolean => {
        const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

        return pattern.test(URLService.convertToUTF8URL(string));
    }

    private static convertToUTF8URL = (string: string) => Buffer.from(decodeURIComponent(string), 'utf-8').toString()
}

export default URLService;
