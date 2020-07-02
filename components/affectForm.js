function AffectControl(props) {
    const { icon, condition, apply, ids } = props

    function handleApply(isAdd) {
        apply(ids, condition, isAdd)
    }

    function add() {
        handleApply(true)
    }

    function remove() {
        handleApply(false)
    }


    return (
        <>
            <div className='affectControl'>
                <p>{condition}</p>
                <img className='icon' src={icon} />
                <div>
                    <button onClick={add}>Add</button>
                    <button onClick={remove}>Remove</button>
                </div>
            </div>
            <style jsx>{`
                .affectControl {
                    display: inline-block;
                }
                .icon {
                    width: 25px;
                    height: 25px;
                }
            `}</style>
        </>
    )
}


export default function AffectForm(props) {
    const { ids, apply } = props

    return (
        <>
            <div>
                <div className='row'>
                    <AffectControl icon={'/blinded.svg'} condition={'Blinded'} apply={apply} ids={ids} />
                    <AffectControl icon={'/charmed.svg'} condition={'Charmed'} apply={apply} ids={ids} />
                    <AffectControl icon={'/deafened.svg'} condition={'Deafened'} apply={apply} ids={ids} />
                    <AffectControl icon={'/exhausted.svg'} condition={'Exhausted'} apply={apply} ids={ids} />
                    <AffectControl icon={'/frightened.svg'} condition={'Frightened'} apply={apply} ids={ids} />
                </div>
                <div className='row'>
                    <AffectControl icon={'/grappled.svg'} condition={'Grappled'} apply={apply} ids={ids} />
                    <AffectControl icon={'/incapacitated.svg'} condition={'Incapacitated'} apply={apply} ids={ids} />
                    <AffectControl icon={'/invisible.svg'} condition={'Invisible'} apply={apply} ids={ids} />
                    <AffectControl icon={'/paralyzed.svg'} condition={'Paralyzed'} apply={apply} ids={ids} />
                    <AffectControl icon={'/petrified.svg'} condition={'Petrified'} apply={apply} ids={ids} />
                </div>
                <div className='row'>
                    <AffectControl icon={'/poisoned.svg'} condition={'Poisoned'} apply={apply} ids={ids} />
                    <AffectControl icon={'/prone.svg'} condition={'Prone'} apply={apply} ids={ids} />
                    <AffectControl icon={'/restrained.svg'} condition={'Restrained'} apply={apply} ids={ids} />
                    <AffectControl icon={'/stunned.svg'} condition={'Stunned'} apply={apply} ids={ids} />
                    <AffectControl icon={'/unconscious.svg'} condition={'Unconscious'} apply={apply} ids={ids} />
                </div>
            </div>
            <style jsx>{`
               .row {
                   width: 100%;
               } 
            `}</style>
        </>
    )
}