import { ProgressBar } from 'react-loader-spinner';
import css from './Loader.module.css';

export const Loader = () => (
  <div className={css.Loader}>
    <ProgressBar
      visible={true}
      height="80"
      width="80"
      wrapperClass=""
      wrapperStyle={{}}
      ariaLabel="progress-bar-loading"
      borderColor="#F4442E"
      barColor="#51E5FF"
    />
  </div>
);
