// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 @title Clone instagram Web3
 @author Gilberts Ahumada
 @notice You can use this contract to emulate descentralized web3 social app
 @dev A este contrato le faltan mas funcionalidades pero cumple con lo minimo
 @custom:clonando este es un contrato minimalista de instagram 
 */
contract Instagram {
    ///@notice Counter for posts
    uint256 public s_postCounterId;

    /**
    @dev Un struct que define o representa un post en la plataforma
    @param description la descripcion del post
    @param uri la uri del post en IPFS
     */
    struct Post {
        string description;
        string uri;
    }

    /// @notice Mapping para almacenar los posts y su identificador
    mapping(uint256 => Post) private s_posts;
    
    /// @notice Mapping para almacenar los posts de cada usuario
    mapping(address => mapping(uint256 => Post)) private s_postsUser;

    /// @notice Conteo de posts por usuario
    mapping(address => uint256) private s_postsCounterByUser;

    /// @notice Likes en las publicaciones según PostId
    mapping(uint256 => address[]) private s_likesOfPost;

    /// @notice Evento emitido cuando se añade un nuevo post
    /// @param postId El identificador del post
    /// @param description La descripción del post
    /// @param owner La dirección del propietario del post
    event PostAdded(uint256 indexed postId, string indexed uri, string indexed description, address owner);

    /// @notice Evento emitido cuando un usuario da like a un post
    /// @param postId El identificador del post
    /// @param user La dirección del usuario que dio like
    event Like(uint256 indexed postId, address user);

    /// @notice Evento emitido cuando un usuario quita su like de un post
    /// @param postId El identificador del post
    /// @param user La dirección del usuario que quitó su like
    event Unlike(uint256 indexed postId, address user);

    /// @notice Error lanzado cuando un post no existe
    /// @param postId El identificador del post que no existe
    error PostDoesNotExist(uint256 postId);

    /// @notice Añade un nuevo post
    /// @param _post La estructura del post que contiene la descripción y el URI
    function addPost(Post memory _post) external {
        require(bytes(_post.uri).length > 0, "Uri can't be empty");
        s_postCounterId++;
        s_posts[s_postCounterId] = _post;
        s_postsUser[msg.sender][s_postCounterId] = _post;
        s_postsCounterByUser[msg.sender]++;
        emit PostAdded(s_postCounterId, _post.uri, _post.description, msg.sender);
    }

    /// @notice Da like a un post
    /// @param _postId El identificador del post
    function like(uint256 _postId) external postsExists(_postId) {
        s_likesOfPost[_postId].push(msg.sender);
        emit Like(_postId, msg.sender);
    }

    /// @notice Quita el like de un post
    /// @param _postId El identificador del post
    function unlike(uint256 _postId) external postsExists(_postId) {
        address[] storage addresses = s_likesOfPost[_postId];

        for (uint256 index = 0; index < addresses.length; index++) {
            if(addresses[index] == msg.sender){
                address lastLike = addresses[addresses.length - 1];
                addresses[index] = lastLike;
                addresses.pop();
                break;
            }
        }

        emit Unlike(_postId, msg.sender);
    }

    /// @notice Obtiene un post por su identificador
    /// @param _postId El identificador del post
    /// @return La estructura del post
    function getPost(uint256 _postId) public view postsExists(_postId) returns(Post memory){
        return s_posts[_postId];
    }

    /// @notice Obtiene un post de un usuario por su identificador
    /// @param _user La dirección del usuario
    /// @param _postId El identificador del post
    /// @return La estructura del post
    function getPostUser(address _user, uint256 _postId) public view postsExists(_postId) returns(Post memory){
        return s_postsUser[_user][_postId];
    }

    /// @notice Obtiene el conteo de posts de un usuario
    /// @param _user La dirección del usuario
    /// @return El número de posts del usuario
    function getPostsCounterByUser(address _user) public view returns(uint256){
        return s_postsCounterByUser[_user];
    }

    /// @notice Obtiene el número de likes de un post
    /// @param _postId El identificador del post
    /// @return El número de likes del post
    function getLikesOfPost(uint256 _postId) public view postsExists(_postId) returns(uint256){
        return s_likesOfPost[_postId].length;
    }

    /// @notice Obtiene el URI de un post
    /// @param _postId El identificador del post
    /// @return El URI del post
    function getUri(uint256 _postId) public view postsExists(_postId) returns(string memory){
        return s_posts[_postId].uri;
    }

    /// @notice Obtiene todos los posts en un rango de identificadores
    /// @param _start El identificador inicial
    /// @param _end El identificador final
    /// @return Un array de posts en el rango especificado
    function getAllPosts(uint256 _start, uint256 _end) public view returns(Post[] memory){
        require(_start > 0 && _end > _start, "Start must be greater than 0");
        require(s_postCounterId >= _end, "End is greater than total posts");
        uint256 length = _end - _start + 1;
        Post[] memory posts = new Post[](length);
        for (uint256 index = 0; index < length; index++) {
            posts[index] = s_posts[_start + index];
        }

        return posts;
    }

    /// @notice Modificador para verificar si un post existe
    /// @param _postId El identificador del post
    modifier postsExists(uint256 _postId){
        if(_postId > s_postCounterId || _postId == 0) revert PostDoesNotExist(_postId);
        _;
    }

}