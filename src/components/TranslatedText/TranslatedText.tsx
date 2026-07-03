import { useTranslation } from 'react-i18next';
import DecryptedText from '../DecryptedText/DecryptedText';

interface TranslatedTextProps {
  i18nKey: string;
  animateOn?: 'view' | 'hover' | 'click';
  className?: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
}

export function TranslatedText({ i18nKey, animateOn = 'view', ...rest }: TranslatedTextProps) {
  const { t, i18n } = useTranslation();
  
  // Usar key={i18n.language} fuerza a que el componente se desmonte
  // y vuelva a montar cuando el idioma cambie, disparando la animación "view".
  return (
    <DecryptedText 
      key={i18n.language} 
      text={t(i18nKey)} 
      animateOn={animateOn} 
      {...rest} 
    />
  );
}
