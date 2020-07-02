function AffectControl(props) {
    const { icon, condition, apply, ids } = props

    function handleApply(isAdd) {
        apply(ids, `${icon}-round.svg`, isAdd)
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
                <img className='icon' src={`${icon}.svg`} />
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
                    <AffectControl icon='/blinded' condition='Blinded' apply={apply} ids={ids} />
                    <AffectControl icon='/charmed' condition='Charmed' apply={apply} ids={ids} />
                    <AffectControl icon='/deafened' condition='Deafened' apply={apply} ids={ids} />
                    <AffectControl icon='/exhausted' condition='Exhausted' apply={apply} ids={ids} />
                    <AffectControl icon='/frightened' condition='Frightened' apply={apply} ids={ids} />
                </div>
                <div className='row'>
                    <AffectControl icon='/grappled' condition='Grappled' apply={apply} ids={ids} />
                    <AffectControl icon='/incapacitated' condition='Incapacitated' apply={apply} ids={ids} />
                    <AffectControl icon='/invisible' condition='Invisible' apply={apply} ids={ids} />
                    <AffectControl icon='/paralyzed' condition='Paralyzed' apply={apply} ids={ids} />
                    <AffectControl icon='/petrified' condition='Petrified' apply={apply} ids={ids} />
                </div>
                <div className='row'>
                    <AffectControl icon='/poisoned' condition='Poisoned' apply={apply} ids={ids} />
                    <AffectControl icon='/prone' condition='Prone' apply={apply} ids={ids} />
                    <AffectControl icon='/restrained' condition='Restrained' apply={apply} ids={ids} />
                    <AffectControl icon='/stunned' condition='Stunned' apply={apply} ids={ids} />
                    <AffectControl icon='/unconscious' condition='Unconscious' apply={apply} ids={ids} />
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