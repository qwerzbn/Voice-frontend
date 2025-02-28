declare namespace API {
  type AudioFile = {
    createTime?: string
    description?: string
    duration?: number
    fileName?: string
    filePath?: string
    fileSize?: number
    fileType?: string
    id?: number
    isDelete?: number
    picture?: string
    tags?: string
    title?: string
    type?: number
    updateTime?: string
    userId?: number
  }

  type AudioFileAddRequest = {
    description?: string
    duration?: number
    fileName?: string
    filePath?: string
    fileSize?: number
    fileType?: string
    picture?: string
    tags?: string[]
    title?: string
    userId?: number
  }

  type AudioFileQueryRequest = {
    current?: number
    description?: string
    duration?: number
    fileName?: string
    filePath?: string
    fileSize?: number
    fileType?: string
    id?: number
    pageSize?: number
    searchText?: string
    sortField?: string
    sortOrder?: string
    tags?: string[]
    title?: string
    userId?: number
  }

  type AudioFileUpdateRequest = {
    description?: string
    duration?: number
    fileName?: string
    filePath?: string
    fileSize?: number
    fileType?: string
    id?: number
    picture?: string
    tags?: string[]
    title?: string
    userId?: number
  }

  type AudioFileVO = {
    createTime?: string
    description?: string
    duration?: number
    fileName?: string
    filePath?: string
    fileSize?: number
    fileType?: string
    id?: number
    isDelete?: number
    picture?: string
    tags?: string[]
    title?: string
    type?: number
    updateTime?: string
    userId?: number
    userVO?: UserVO
  }

  type BaseResponseAudioFileVO_ = {
    code?: number
    data?: AudioFileVO
    message?: string
  }

  type BaseResponseBoolean_ = {
    code?: number
    data?: boolean
    message?: string
  }

  type BaseResponseListAudioFileVO_ = {
    code?: number
    data?: AudioFileVO[]
    message?: string
  }

  type BaseResponseLoginUserVO_ = {
    code?: number
    data?: LoginUserVO
    message?: string
  }

  type BaseResponseLong_ = {
    code?: number
    data?: number
    message?: string
  }

  type BaseResponsePageAudioFile_ = {
    code?: number
    data?: PageAudioFile_
    message?: string
  }

  type BaseResponsePageAudioFileVO_ = {
    code?: number
    data?: PageAudioFileVO_
    message?: string
  }

  type BaseResponsePageUser_ = {
    code?: number
    data?: PageUser_
    message?: string
  }

  type BaseResponsePageUserVO_ = {
    code?: number
    data?: PageUserVO_
    message?: string
  }

  type BaseResponseString_ = {
    code?: number
    data?: string
    message?: string
  }

  type BaseResponseUser_ = {
    code?: number
    data?: User
    message?: string
  }

  type BaseResponseUserVO_ = {
    code?: number
    data?: UserVO
    message?: string
  }

  type ConversionResponse = {
    downloadUrl?: string
    error?: string
    success?: boolean
  }

  type DeleteRequest = {
    id?: number
  }

  type getAudioFileVOByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type getUserByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type getUserVOByIdUsingGETParams = {
    /** id */
    id?: number
  }

  type LoginUserVO = {
    createTime?: string
    id?: number
    updateTime?: string
    userAvatar?: string
    userName?: string
    userProfile?: string
    userRole?: string
  }

  type OrderItem = {
    asc?: boolean
    column?: string
  }

  type PageAudioFile_ = {
    countId?: string
    current?: number
    maxLimit?: number
    optimizeCountSql?: boolean
    orders?: OrderItem[]
    pages?: number
    records?: AudioFile[]
    searchCount?: boolean
    size?: number
    total?: number
  }

  type PageAudioFileVO_ = {
    countId?: string
    current?: number
    maxLimit?: number
    optimizeCountSql?: boolean
    orders?: OrderItem[]
    pages?: number
    records?: AudioFileVO[]
    searchCount?: boolean
    size?: number
    total?: number
  }

  type PageUser_ = {
    countId?: string
    current?: number
    maxLimit?: number
    optimizeCountSql?: boolean
    orders?: OrderItem[]
    pages?: number
    records?: User[]
    searchCount?: boolean
    size?: number
    total?: number
  }

  type PageUserVO_ = {
    countId?: string
    current?: number
    maxLimit?: number
    optimizeCountSql?: boolean
    orders?: OrderItem[]
    pages?: number
    records?: UserVO[]
    searchCount?: boolean
    size?: number
    total?: number
  }

  type PPTConvertRequest = {
    imageList?: string[]
    type?: number
  }

  type PreviewResponse = {
    error?: string
    slides?: string[]
    success?: boolean
  }

  type testDownloadFileUsingGETParams = {
    /** filepath */
    filepath?: string
  }

  type TTSRequest = {
    language?: string
    text?: string
    type?: number
  }

  type uploadAudioUsingPOSTParams = {
    biz?: string
  }

  type uploadFileUsingPOSTParams = {
    biz?: string
  }

  type User = {
    createTime?: string
    id?: number
    isDelete?: number
    updateTime?: string
    userAccount?: string
    userAvatar?: string
    userName?: string
    userPassword?: string
    userProfile?: string
    userRole?: string
  }

  type UserAddRequest = {
    userAccount?: string
    userAvatar?: string
    userName?: string
    userRole?: string
  }

  type UserLoginRequest = {
    type?: number
    userAccount?: string
    userPassword?: string
  }

  type UserQueryRequest = {
    current?: number
    id?: number
    pageSize?: number
    sortField?: string
    sortOrder?: string
    userName?: string
    userProfile?: string
    userRole?: string
  }

  type UserRegisterRequest = {
    checkPassword?: string
    type?: number
    userAccount?: string
    userPassword?: string
  }

  type UserUpdateMyRequest = {
    userAvatar?: string
    userName?: string
    userProfile?: string
  }

  type UserUpdateRequest = {
    id?: number
    userAvatar?: string
    userName?: string
    userProfile?: string
    userRole?: string
  }

  type UserVO = {
    createTime?: string
    id?: number
    userAvatar?: string
    userName?: string
    userProfile?: string
    userRole?: string
  }

  type VideoRequest = {
    audioFileVO?: AudioFileVO
    filePath?: string
  }
}
