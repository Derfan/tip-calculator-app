import { TipCalculator } from '../../widgets';

import cn from './styles.module.sass';

export const App = () => {
    return (
        <div className={cn.container}>
            <TipCalculator />
        </div>
    )
}
