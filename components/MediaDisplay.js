import { useState } from 'react';
import styles from './MediaDisplay.module.css';

export default function MediaDisplay({ media = [] }) {
  const [selectedMedia, setSelectedMedia] = useState(null);

  if (!media || media.length === 0) return null;

  const openModal = (mediaItem) => {
    setSelectedMedia(mediaItem);
  };

  const closeModal = () => {
    setSelectedMedia(null);
  };

  return (
    <>
      <div className={styles.mediaContainer}>
        {media.length === 1 && (
          <div className={styles.singleMedia}>
            {media[0].type === 'image' ? (
              <img
                src={media[0].url}
                alt="Post media"
                className={styles.mediaItem}
                onClick={() => openModal(media[0])}
              />
            ) : (
              <video
                src={media[0].url}
                className={styles.mediaItem}
                controls
                preload="metadata"
              />
            )}
          </div>
        )}

        {media.length === 2 && (
          <div className={styles.twoMedia}>
            {media.map((item, index) => (
              <div key={index} className={styles.mediaWrapper}>
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={`Post media ${index + 1}`}
                    className={styles.mediaItem}
                    onClick={() => openModal(item)}
                  />
                ) : (
                  <video
                    src={item.url}
                    className={styles.mediaItem}
                    controls
                    preload="metadata"
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {media.length === 3 && (
          <div className={styles.threeMedia}>
            <div className={styles.mainMedia}>
              {media[0].type === 'image' ? (
                <img
                  src={media[0].url}
                  alt="Post media 1"
                  className={styles.mediaItem}
                  onClick={() => openModal(media[0])}
                />
              ) : (
                <video
                  src={media[0].url}
                  className={styles.mediaItem}
                  controls
                  preload="metadata"
                />
              )}
            </div>
            <div className={styles.sideMedia}>
              {media.slice(1, 3).map((item, index) => (
                <div key={index} className={styles.mediaWrapper}>
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt={`Post media ${index + 2}`}
                      className={styles.mediaItem}
                      onClick={() => openModal(item)}
                    />
                  ) : (
                    <video
                      src={item.url}
                      className={styles.mediaItem}
                      controls
                      preload="metadata"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {media.length >= 4 && (
          <div className={styles.fourMedia}>
            {media.slice(0, 3).map((item, index) => (
              <div key={index} className={styles.mediaWrapper}>
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={`Post media ${index + 1}`}
                    className={styles.mediaItem}
                    onClick={() => openModal(item)}
                  />
                ) : (
                  <video
                    src={item.url}
                    className={styles.mediaItem}
                    controls
                    preload="metadata"
                  />
                )}
              </div>
            ))}
            <div className={styles.moreMedia} onClick={() => openModal(media[3])}>
              {media[3].type === 'image' ? (
                <img
                  src={media[3].url}
                  alt="Post media 4"
                  className={styles.mediaItem}
                />
              ) : (
                <video
                  src={media[3].url}
                  className={styles.mediaItem}
                  preload="metadata"
                />
              )}
              {media.length > 4 && (
                <div className={styles.overlay}>
                  <span className={styles.moreCount}>+{media.length - 4}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Modal for fullscreen view */}
      {selectedMedia && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closeModal}>
              ✕
            </button>
            {selectedMedia.type === 'image' ? (
              <img
                src={selectedMedia.url}
                alt="Fullscreen media"
                className={styles.fullscreenMedia}
              />
            ) : (
              <video
                src={selectedMedia.url}
                className={styles.fullscreenMedia}
                controls
                autoPlay
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
