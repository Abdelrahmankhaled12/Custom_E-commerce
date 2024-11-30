import ButtonScroll from '../buttonScroll/ButtonScroll';
import './style.scss'; // Importing style file

// Effect component definition with TypeScript typing for props
interface EffectProps {
    children: React.ReactNode; // Defining the type of the 'children' prop
}

const Effect: React.FC<EffectProps> = ({ children }) => {
    return (
        <>
            <div className='effect'>
                <div className="children">
                    {children} {/* Rendering children components */}
                    <ButtonScroll />
                </div>
            </div>
        </>
    );
};

export default Effect; // Exporting Effect component
