import { staticPageUrl } from "@/api/staticPage.api";
import Notify from "@/utils/notify";
import { Skeleton } from "@mui/material";
import styles from "../../internalPages/about-us/aboutUs.module.css";

async function fetchingStaticData(endpoint) {
  const response = await staticPageUrl(endpoint);
  const htmlResponse = await fetch(response.data.data.filePath);
  const htmlContent = await htmlResponse.text();
  return htmlContent;
}

const StaticPage = async ({ endpoint, className }) => {
  const pageContent = await fetchingStaticData(endpoint);

  const skeletons =
    endpoint !== "contactUs" ? (
      <>
        <div className={styles.heading}>
          <Skeleton variant="text" width="20%" height={60} />
        </div>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className={styles.paper}>
            <div className={styles.type}>
              <Skeleton variant="text" width="100%" height={40} />
            </div>
          </div>
        ))}
      </>
    ) : (
      Array.from({ length: 1 }).map((_, index) => (
        <div key={index} className={styles.mainDiv}>
          <div className={styles.contactSkeleton}>
            <Skeleton variant="text" width={250} height={90} />
            <div>
              <div className={styles.skeletonDiv}>
                <Skeleton variant="text" width={50} height={70} />

                <Skeleton variant="text" width={150} height={70} />
              </div>
              <div className={styles.skeletonDiv}>
                <Skeleton variant="text" width={50} height={70} />

                <Skeleton variant="text" width={200} height={70} />
              </div>
              <div className={styles.skeletonDiv}>
                <Skeleton variant="text" width={50} height={70} />

                <Skeleton variant="text" width={380} height={70} />
              </div>
              <div className={styles.skeletonDiv}>
                <Skeleton variant="text" width={50} height={70} />

                <Skeleton variant="text" width={380} height={70} />
              </div>
            </div>
          </div>
        </div>
      ))
    );

  return pageContent ? (
    <div
      className={`${className} additional-class`}
      dangerouslySetInnerHTML={{ __html: pageContent }}
    />
  ) : (
    skeletons
  );
};

export default StaticPage;
