import { Popover, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { HiOutlineSearch } from 'react-icons/hi';
import { IoNotificationsOutline } from 'react-icons/io5';
import { LuUserCircle2 } from 'react-icons/lu';
import { useNavigate } from 'react-router-dom';
function Header() {
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [role, setRole] = useState('');
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const [imgUser, setImgUser] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const nomData = localStorage.getItem('nomdata');
    const prenomData = localStorage.getItem('prenomdata');
    const roleData = localStorage.getItem('role');
    const imgData = localStorage.getItem('image');
    setNom(nomData);
    setPrenom(prenomData);
    setRole(roleData);
    setImgUser(imgData);
  }, []);
  const reglage = () => {
    navigate("/Reglageprofile");
  }
  return (
    <header className="bg-white h-12 px-4 flex justify-between items-center text-gray-700" style={{ fontFamily: 'Alegreya', fontSize: '20px' }}>
      Bienvenue {role}  {prenom}  {nom}
      <div className="relative">
				<HiOutlineSearch fontSize={20} className="text-gray-400 absolute top-1/2 left-3 -translate-y-1/2" />
				<input
					type="text"
					placeholder="Search..."
					className="text-sm focus:outline-none active:outline-none border border-gray-300 w-[24rem] h-10 pl-11 pr-4 rounded-sm"
				/>
			</div>
      <div className="flex flex-row">
        <Popover>
          {({ open }) => (
            <>
              <Popover.Button className={`p-1.5 rounded-sm inline-flex items-center text-gray-700 focus:outline-none ${open ? 'bg-gray-100' : ''}`}>
                <IoNotificationsOutline style={{ fontSize: '24px', marginRight: '16px' }} />
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 p-2.5">
                    <strong className="text-gray-700 font-medium">Notification</strong>
                    <div className="mt-2 py-1 text-sm">Notification reçue</div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>

        <Popover>
          {({ open }) => (
            <>
            <Popover.Button className="p-1.5 rounded-sm inline-flex items-center text-gray-700 focus:outline-none" onClick={() => setOpenProfileMenu(!openProfileMenu)}>
  {imgUser ? (
    <img
      src={imgUser}
      alt="User"
      className="w-6 h-6 rounded-full"
      style={{ marginRight: '16px' }}
    />
  ) : (
    <LuUserCircle2 fontSize={24} style={{ marginRight: '16px' }} />
  )}
</Popover.Button>

              <Transition
                show={openProfileMenu}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute right-0 z-10 mt-2.5 w-80">
                  <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 p-2.5">
                    <ul className="mt-2 py-1 text-sm list-group" id="list-tab" role="tablist">
                      <li className="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home">Home</li>
                      <li className="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="list-profile" onClick={reglage}> Reglage Profile</li>
                      <li className="list-group-item list-group-item-action" id="list-settings-list" data-bs-toggle="list" href="#list-settings" role="tab" aria-controls="list-settings">se déconncter</li>
                    </ul>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
    </header>
  );
}

export default Header;
