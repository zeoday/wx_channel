# 微信视频号 API 完整文档

本文件基于对 `virtual_svg-icons-register.publishCGqZ4qpO.js` 的静态分析生成。

## 1. API 列表 (基础信息)

| API 名称 | JS 方法名 | Command ID | URL Endpoint |
|---|---|---|---|
| FinderGetCommentDetail | `finderGetCommentDetail` | `5259` | `/cgi-bin/micromsg-bin/pc_findergetcommentdetail` |
| FinderLike | `finderLike` | `4220` | `/cgi-bin/micromsg-bin/pc_finderlike` |
| FinderComment | `finderComment` | `4062` | `/cgi-bin/micromsg-bin/pc_findercomment` |
| FinderGetRelatedList | `finderGetRelatedList` | `5222` | `/cgi-bin/micromsg-bin/pc_findergetrelatedlist` |
| FinderUserPage | `finderUserPage` | `6624` | `/cgi-bin/micromsg-bin/pc_finderuserpage` |
| FinderFollow | `finderFollow` | `5908` | `/cgi-bin/micromsg-bin/pc_finderfollow` |
| FinderFav | `finderFav` | `5237` | `/cgi-bin/micromsg-bin/pc_finderfav` |
| FinderGetFeedLikedList | `finderGetFeedLikedList` | `5910` | `/cgi-bin/micromsg-bin/pc_findergetfeedlikedlist` |
| FinderContactTagOption | `finderContactTagOption` | `6696` | `/cgi-bin/micromsg-bin/pc_findercontacttagoption` |
| FinderContactTagOption | `finderContactTagOption` | `6696` | `/cgi-bin/micromsg-bin/pc_findercontacttagoption` |
| FinderFeedback | `finderFeedback` | `388` | `/cgi-bin/micromsg-bin/pc_finderfeedback` |
| FinderStatsReport | `finderStatsReport` | `6874` | `/cgi-bin/micromsg-bin/pc_finderstatsreport` |
| FinderExtStatsReport | `finderExtStatsReport` | `4088` | `/cgi-bin/micromsg-bin/pc_finderextstatsreport` |
| FinderGetRecommend | `N/A` | `6638` | `/cgi-bin/micromsg-bin/pc_findergetpcrecommend` |
| FinderBatchGetLiveInfo | `finderBatchGetLiveInfo` | `6650` | `/cgi-bin/micromsg-bin/pc_finderbatchgetliveinfo` |
| FinderCheckPrefetch | `finderCheckPrefetch` | `11077` | `/cgi-bin/micromsg-bin/pc_findercheckprefetch` |
| FinderGetAppmsgContextFromWeb | `finderGetAppmsgContextFromWeb` | `N/A` | `N/A` |
| FinderGetCommentList | `finderGetCommentList` | `10753` | `/cgi-bin/micromsg-bin/pc_findergetcommentlist` |
| FinderAsyncGetCommentInfo | `finderAsyncGetCommentInfo` | `36358` | `/cgi-bin/micromsg-bin/pc_finderasyncgetcommentinfo` |
| FinderGetUser | `finderGetUser` | `10509` | `/cgi-bin/micromsg-bin/pc_findergetuser` |
| FinderMusicAlbumUserPage | `finderMusicAlbumUserPage` | `10937` | `/cgi-bin/micromsg-bin/h5_findermusicalbumuserpage` |
| FetchFinderMemberFeedList | `fetchFinderMemberFeedList` | `7913` | `/cgi-bin/micromsg-bin/h5fetchfindermemberfeedlist` |
| FetchFinderMemberShipHomeInfo | `fetchFinderMemberShipHomeInfo` | `8369` | `/cgi-bin/micromsg-bin/h5fetchfindermembershiphomeinfo` |
| FetchFinderMemberShipDetailInfo | `fetchFinderMemberShipDetailInfo` | `8973` | `/cgi-bin/micromsg-bin/h5fetchfindermembershipdetailinfo` |
| FetchFinderMemberStatus | `fetchFinderMemberStatus` | `14552` | `/cgi-bin/micromsg-bin/h5fetchfindermemberstatus` |
| FinderUserPagePreview | `finderUserPagePreview` | `20142` | `/cgi-bin/micromsg-bin/pc_finderuserpagepreview` |
| FinderBatchGetObjectAsyncLoadInfo | `finderBatchGetObjectAsyncLoadInfo` | `8050` | `/cgi-bin/micromsg-bin/pc_finderbatchgetobjectasyncloadinfo` |
| FinderAdFeedback | `finderAdFeedback` | `3594` | `/cgi-bin/micromsg-bin/pc_finderadfeedback` |
| FinderAdReport | `finderAdReport` | `28721` | `/cgi-bin/micromsg-bin/pc_finderadreport` |

## 2. API 载荷分析 (请求数据结构)

> **说明**:
> - `BaseReq`: 代表继承自 `this.finderBasereq` 的基础请求参数。
> - `DynamicParams`: 代表调用 API 时传入的动态参数 (代码中的 `...t`)。
> - `requestId: Generated`: 代表自动生成的请求 ID。

| API 名称 | JS 方法名 | 请求数据结构 (Payload) |
|---|---|---|
| **FinderGetFollowList** | `finderGetFollowList` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderGetFavList** | `finderGetFavList` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderGetLikedList** | `finderGetLikedList` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderGetPlayHistory** | `finderGetPlayHistory` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderOpPlayHistory** | `finderOpPlayHistory` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderNewUserPrepare** | `finderNewUserPrepare` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderGetInteractionedFeedList** | `finderGetInteractionedFeedList` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderGetCommentDetail** | `finderGetCommentDetail` | `{finderBasereq:{BaseReq,exptFlag:1,requestId: Generated},platformScene:2,DynamicParams}` |
| **FinderLike** | `finderLike` | `{finderBasereq:{BaseReq,exptFlag:1},DynamicParams}` |
| **FinderComment** | `finderComment` | `{finderBasereq:{BaseReq,exptFlag:1},DynamicParams}` |
| **FinderGetRelatedList** | `finderGetRelatedList` | `{finderBasereq:{BaseReq,requestId: Generated},DynamicParams}` |
| **FinderUserPage** | `finderUserPage` | `{finderBasereq:{BaseReq,requestId: Generated},DynamicParams}` |
| **FinderFollow** | `finderFollow` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderFav** | `finderFav` | `{finderBasereq:{BaseReq,exptFlag:1},DynamicParams}` |
| **FinderGetFeedLikedList** | `finderGetFeedLikedList` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderContactTagOption** | `finderContactTagOption` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderFeedback** | `finderFeedback` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderExtStatsReport** | `finderExtStatsReport` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderStatsReport** | `finderStatsReport` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderGetRecommend** | `finderGetRecommend` | `{finderBasereq:{BaseReq,exptFlag:1,requestId: Generated},DynamicParams}` |
| **FinderBatchGetLiveInfo** | `finderBatchGetLiveInfo` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderCheckPrefetch** | `finderCheckPrefetch` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderGetAppmsgContextFromWeb** | `finderGetAppmsgContextFromWeb` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderGetCommentList** | `finderGetCommentList` | `{finderBasereq:{BaseReq,BaseReqParams},pcDeviceType:fe.deviceId,DynamicParams}` |
| **FinderAsyncGetCommentInfo** | `finderAsyncGetCommentInfo` | `{finderBasereq:{BaseReq,BaseReqParams},DynamicParams}` |
| **FinderGetUser** | `finderGetUser` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderMusicAlbumUserPage** | `finderMusicAlbumUserPage` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FetchFinderMemberFeedList** | `fetchFinderMemberFeedList` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderUserPagePreview** | `finderUserPagePreview` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FetchFinderMemberShipHomeInfo** | `fetchFinderMemberShipHomeInfo` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FetchFinderMemberShipDetailInfo** | `fetchFinderMemberShipDetailInfo` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FetchFinderMemberStatus** | `fetchFinderMemberStatus` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderBatchGetObjectAsyncLoadInfo** | `finderBatchGetObjectAsyncLoadInfo` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderAdFeedback** | `finderAdFeedback` | `{finderBasereq:{BaseReq,BaseReqParams},DynamicParams}` |
| **FinderAdReport** | `finderAdReport` | `{finderBasereq:{BaseReq,BaseReqParams},DynamicParams}` |
| **JoinLive** | `joinLive` | `{}` |
| **LiveTopComment** | `liveTopComment` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **BanLiveComment** | `banLiveComment` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **Oplog** | `oplog` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **LiveGetContact** | `liveGetContact` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **CreateLivePrepare** | `createLivePrepare` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **CreateLive** | `createLive` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **SetAnchorStatus** | `setAnchorStatus` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **ManualCloseLive** | `manualCloseLive` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderPostLiveMsg** | `finderPostLiveMsg` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderLikeLive** | `finderLikeLive` | `{finderBasereq:{BaseReq,exptFlag:1},DynamicParams}` |
| **FinderPostLiveAppMsg** | `finderPostLiveAppMsg` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderGetLiveOnlineMember** | `finderGetLiveOnlineMember` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderLiveSwitchIdentity** | `finderLiveSwitchIdentity` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **Finderlivesyncextrainfo** | `finderLiveSyncExtraInfo` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderLiveApplyMicWithAudience** | `finderLiveApplyMicWithAudience` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderLiveAcceptMicWithAudience** | `finderLiveAcceptMicWithAudience` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderLiveCloseMicWithAudience** | `finderLiveCloseMicWithAudience` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderLiveRefreshMicWithAudience** | `finderLiveRefreshMicWithAudience` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderLiveGetShareQRCode** | `finderLiveGetShareQRCode` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderGetLiveInfo** | `finderGetLiveInfo` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderLiveUserPage** | `finderLiveUserPage` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderBatchGetObjectAsyncLoadInfo** | `finderBatchGetObjectAsyncLoadInfo` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderGetLatestLiveObject** | `finderGetLatestLiveObject` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderAudienceReserveLive** | `finderAudienceReserveLive` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderLiveNoticeQrcode** | `finderLiveNoticeQrcode` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderLiveEcQrcode** | `finderLiveEcQrcode` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderLiveGetShopShelf** | `finderLiveGetShopShelf` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderLiveKtvGetPlayMember** | `finderLiveKtvGetPlayMember` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderLiveKtvGetQRCode** | `finderLiveKtvGetQRCode` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderLiveKtvGetResource** | `finderLiveKtvGetResource` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderGetLiveRewardGiftList** | `finderGetLiveRewardGiftList` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
| **FinderPcFlow** | `finderPcFlow` | `{finderBasereq:{BaseReq,exptFlag:1,requestId: Generated},DynamicParams}` |
| **FinderStream** | `finderStream` | `{finderBasereq:{BaseReq,requestId: Generated},DynamicParams}` |
| **FinderGetPcReddot** | `finderGetPcReddot` | `{finderBasereq:this.finderBasereq,DynamicParams}` |
