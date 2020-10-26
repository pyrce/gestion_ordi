var url="";
if(!process.env.DATABASE_URL){

 url = 'mysql://root:root@localhost:3306/gestion_ordi'
}else{
     url = process.env.DATABASE_URL;
}

module.exports =  url;