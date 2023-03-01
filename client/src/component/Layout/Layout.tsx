import { FC } from 'react';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import './Layout.css';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children, ...props }) => {
  return (
    <div className="layout_container" {...props}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};
