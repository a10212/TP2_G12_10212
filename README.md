# TP2_G12_10212
Repositório trabalho prático 2 da UC de Arquitetura de Sistemas


Instruções de execução:

API: Server
1 - instalar o MongoDb
2 - instalar o nodejs e o npm
3 - navegar até à diretoria do projeto
4 - executar o comando npm start

API: Client
1 - instalar o APK TP2


Intruções de utilização:
O primeiro utilizador do sistema deverá ser um administrador.
1 - Adicionar um utilizador utilizando a rota <serverip>:5000/utilizadores/
2 - abrir a base de dados MongoDB com um gestor de base de dados (ex. Compass) e alterar o utilizador para o estado "ativo"
3 - Adicionar um novo utilizador do tipo cliente
4 - Autenticar o utilizador administrador e aprovar o registo do ultimo utilizador
5 - Utilizar a API normalmente com os tokens gerados atraves da rota <serverip>:5000/login/
