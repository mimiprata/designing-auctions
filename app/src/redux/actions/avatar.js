export const FETCH_AVATAR_FOR_USER = 'FETCH_AVATAR_FOR_USER';
export const FETCH_AVATAR_FOR_USER_FULFILLED =`${FETCH_AVATAR_FOR_USER}_FULFILLED`;
export const FETCH_AVATAR_FOR_USER_REJECTED = `${FETCH_AVATAR_FOR_USER}_REJECTED`;

export const fetchAvatar = (user) =>({
    type: FETCH_AVATAR_FOR_USER,
    payload: {user}
});