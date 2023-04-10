import './loader.scss';

interface IIndex extends React.CSSProperties {
  '--i'?: number;
}

export const LoaderComponent = () => (
  <div className="loader">
    {[...Array(16)].map((_, i) => {
      const indexStyle: IIndex = { '--i': i + 1 };

      return (
        <span
          className="load__item"
          style={indexStyle}
          key={Math.random()}
        />
      );
    })}
  </div>
);
