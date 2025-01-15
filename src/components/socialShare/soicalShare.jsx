"use client"

import styles from './soicalShare.module.css'

import {
    FacebookShareButton,
    FacebookIcon,

    TwitterShareButton,
    TwitterIcon,

    LinkedinShareButton,
    LinkedinIcon,

    RedditShareButton,
    RedditIcon,

    TelegramShareButton,
    TelegramIcon,

    LineShareButton,
    LineIcon,

    PinterestShareButton,
    PinterestIcon,

    WeiboShareButton,
    WeiboIcon,
} from 'next-share'

const SoicalShareButtons = () => {
    const shareUrl = process.env.NEXT_PUBLIC_SHARE_URL
    const shareTitle = process.env.NEXT_PUBLIC_SHARE_TITLE
    const shareDesc = process.env.NEXT_PUBLIC_SHARE_DESC

    const shareIConSize = 48

    console.log(shareUrl, shareTitle, shareDesc)

    return <div className={styles.container}>
        <FacebookShareButton
            url={shareUrl}
            quote={shareDesc}>
            <FacebookIcon size={shareIConSize} round />
        </FacebookShareButton>

        <TwitterShareButton
            url={shareUrl}
            title={shareTitle}
        >
            <TwitterIcon size={shareIConSize} round />
        </TwitterShareButton>

        <LinkedinShareButton url={shareUrl}>
            <LinkedinIcon size={shareIConSize} round />
        </LinkedinShareButton>

        <RedditShareButton
            url={shareUrl}
            title={shareTitle}>
            <RedditIcon size={shareIConSize} round />
        </RedditShareButton>

        <TelegramShareButton
            url={shareUrl}
            title={shareTitle}
        >
            <TelegramIcon size={shareIConSize} round />
        </TelegramShareButton>

        <LineShareButton
            url={shareUrl}
            title={shareTitle}
        >
            <LineIcon size={shareIConSize} round />
        </LineShareButton>

        <PinterestShareButton
            url={shareUrl}
            media={shareDesc}
        >
            <PinterestIcon size={shareIConSize} round />
        </PinterestShareButton>

        <WeiboShareButton
            url={shareUrl}
            title={shareTitle}
        >
            <WeiboIcon size={shareIConSize} round />
        </WeiboShareButton>

    </div>
}

export default SoicalShareButtons