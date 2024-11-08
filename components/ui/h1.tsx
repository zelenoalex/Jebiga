type H1Props = {
  title: string;
};

const H1 = ({ title }: H1Props) => {
  return (
    <h1 className="text-xl text-primary lg:text-3xl my-5 lg:my-10">{title}</h1>
  );
};

export default H1;
