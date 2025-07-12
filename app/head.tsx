import Script from "next/script";

export default function Head() {
    return (
        <>
            <title>Ваш заголовок</title>
            {/*/!* Другие метатеги *!/*/}

            <Script
                src="https://cdn.amplitude.com/script/f7a6a75ff69374b1f137cd2a3c3daee6.js"
                strategy="beforeInteractive"
            />
            <Script id="amplitude-init" strategy="beforeInteractive">
                {`
          window.amplitude.add(window.sessionReplay.plugin({sampleRate: 1}));
          window.amplitude.init('f7a6a75ff69374b1f137cd2a3c3daee6', {
            fetchRemoteConfig: true,
            autocapture: true
          });
        `}
            </Script>
        </>
    );
}
