import { useLocation } from 'react-router-dom';
import { Fragment, useState, memo } from 'react';
import { Download, FileText, FileQuestion, CircleDollarSign } from 'lucide-react';
import { Menu, Transition } from '@headlessui/react';
import { useRecoilValue, useRecoilState } from 'recoil';
import { useGetUserBalance, useGetStartupConfig } from 'librechat-data-provider/react-query';
import type { TConversation } from 'librechat-data-provider';
import FilesView from '~/components/Chat/Input/Files/FilesView';
import Information from '~/components/Chat/Input/Files/Information';
import Pricing from '~/components/Chat/Input/Files/Pricing';
import { useAuthContext } from '~/hooks/AuthContext';
import useAvatar from '~/hooks/Messages/useAvatar';
import { ExportModal } from './ExportConversation';
import { LinkIcon, GearIcon } from '~/components';
import { UserIcon } from '~/components/svg';
import { useLocalize } from '~/hooks';
import Settings from './Settings';
import NavLink from './NavLink';
import Logout from './Logout';
import { cn } from '~/utils/';
import store from '~/store';
import { M } from 'vite/dist/node/types.d-jgA8ss1A';

function NavLinks() {
  const localize = useLocalize();
  const location = useLocation();
  const { user, isAuthenticated } = useAuthContext();
  const { data: startupConfig } = useGetStartupConfig();
  const balanceQuery = useGetUserBalance({
    enabled: !!isAuthenticated && startupConfig?.checkBalance,
  });
  const [showExports, setShowExports] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showInformation, setShowInformation] = useState(false);
  const [showPricing, setShowPricing] = useState(false);
  const [showFiles, setShowFiles] = useRecoilState(store.showFiles);

  const activeConvo = useRecoilValue(store.conversationByIndex(0));
  const globalConvo = useRecoilValue(store.conversation) ?? ({} as TConversation);

  const avatarSrc = useAvatar(user);

  let conversation: TConversation | null | undefined;
  if (location.state?.from?.pathname.includes('/chat')) {
    conversation = globalConvo;
  } else {
    conversation = activeConvo;
  }

  const exportable =
    conversation &&
    conversation.conversationId &&
    conversation.conversationId !== 'new' &&
    conversation.conversationId !== 'search';

  const clickHandler = () => {
    if (exportable) {
      setShowExports(true);
    }
  };

  return (
    <>
      <Menu as="div" className="group relative">
        {({ open }) => (
          <>
            {/* {startupConfig?.checkBalance && balanceQuery.data && ( */}
            {startupConfig?.checkBalance && (
              <div className="whitespace-nowrap text-left text-sm text-black dark:text-gray-200">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex gap-2 rounded-md border border-transparent px-4 py-2 text-sm  text-white shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:hover:bg-gray-700">
                      {/* <CircleDollarSign className="icon-md" /> */}
                      Credits:
                      {balanceQuery.data && (
                        <div className="flex items-center gap-1.5">
                          <span className="text-black dark:text-white">
                            {Math.floor(Number(balanceQuery.data) / 10)}
                          </span>
                        </div>
                      )}
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute bottom-full left-0 z-20 mb-1 mt-1 w-auto overflow-hidden rounded-lg bg-white py-1.5 opacity-100 outline-none dark:bg-gray-800">
                      <div className="py-1">
                        <Menu.Item>
                          <NavLink
                            className="flex w-full cursor-pointer items-center gap-3 rounded-none px-3 py-3 text-sm text-black transition-colors duration-200 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                            svg={() => <FileQuestion className="icon-md" />}
                            text="What are credits?"
                            clickHandler={() => setShowInformation(true)}
                          />
                        </Menu.Item>
                        {/* <Menu.Item>
                          <NavLink
                            className="flex w-full cursor-pointer items-center gap-3 rounded-none px-3 py-3 text-sm text-black transition-colors duration-200 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                            svg={() => <CircleDollarSign className="icon-md" />}
                            text="Buy credits"
                            clickHandler={() =>
                              window.open('mailto:contact.sastagpt@gmail.com', '_blank')
                            }
                          />
                        </Menu.Item> */}
                        <Menu.Item>
                          <NavLink
                            className="flex w-full cursor-pointer items-center gap-3 rounded-none px-3 py-3 text-sm text-black transition-colors duration-200 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                            svg={() => <CircleDollarSign className="icon-md" />}
                            text="Pricing"
                            clickHandler={() => setShowPricing(true)}
                          />
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            )}
            <Menu.Button
              className={cn(
                'group-ui-open:bg-gray-100 dark:group-ui-open:bg-gray-700 duration-350 mt-text-sm mb-1 flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700',
                open ? 'bg-gray-100 dark:bg-gray-700' : '',
              )}
              data-testid="nav-user"
            >
              <div className="-ml-0.9 -mt-0.8 h-8 w-7 flex-shrink-0">
                <div className="relative flex">
                  {!user?.avatar && !user?.username ? (
                    <div
                      style={{
                        backgroundColor: 'rgb(121, 137, 255)',
                        width: '28px',
                        height: '28px',
                      }}
                      className="relative flex h-9 w-9 items-center justify-center rounded-full p-1 text-white"
                    >
                      <UserIcon />
                    </div>
                  ) : (
                    <img className="rounded-full" src={user?.avatar || avatarSrc} alt="avatar" />
                  )}
                </div>
              </div>
              <div
                className="mt-2 grow overflow-hidden text-ellipsis whitespace-nowrap text-left text-black dark:text-white"
                style={{ marginTop: '-4px', marginLeft: '2px' }}
              >
                {user?.name || localize('com_nav_user')}
              </div>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-110 transform"
              enterFrom="translate-y-2 opacity-0"
              enterTo="translate-y-0 opacity-100"
              leave="transition ease-in duration-100 transform"
              leaveFrom="translate-y-0 opacity-100"
              leaveTo="translate-y-2 opacity-0"
            >
              <Menu.Items className="absolute bottom-full left-0 z-20 mb-1 mt-1 w-full translate-y-0 overflow-hidden rounded-lg bg-white py-1.5 opacity-100 outline-none dark:bg-gray-800">
                <Menu.Item as="div">
                  <NavLink
                    className={cn(
                      'flex w-full cursor-pointer items-center gap-3 rounded-none px-3 py-3 text-sm text-black transition-colors duration-200 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700',
                      exportable
                        ? 'cursor-pointer text-black dark:text-white'
                        : 'cursor-not-allowed text-black/50 dark:text-white/50',
                    )}
                    svg={() => <Download size={16} />}
                    text={localize('com_nav_export_conversation')}
                    clickHandler={clickHandler}
                  />
                </Menu.Item>
                <div className="my-1 h-px bg-black/20 dark:bg-white/20" role="none" />
                <Menu.Item as="div">
                  <NavLink
                    className="flex w-full cursor-pointer items-center gap-3 rounded-none px-3 py-3 text-sm text-black transition-colors duration-200 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    svg={() => <FileText className="icon-md" />}
                    text="My Files"
                    clickHandler={() => setShowFiles(true)}
                  />
                </Menu.Item>
                {startupConfig?.helpAndFaqURL !== '/' && (
                  <Menu.Item as="div">
                    <NavLink
                      className="flex w-full cursor-pointer items-center gap-3 rounded-none px-3 py-3 text-sm text-black transition-colors duration-200 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                      svg={() => <LinkIcon />}
                      text={localize('com_nav_help_faq')}
                      // clickHandler={() => window.open(startupConfig?.helpAndFaqURL, '_blank')}
                      // Send mail to support instead
                      clickHandler={() =>
                        window.open('mailto:contact.sastagpt@gmail.com', '_blank')
                      }
                    />
                  </Menu.Item>
                )}
                <Menu.Item as="div">
                  <NavLink
                    className="flex w-full cursor-pointer items-center gap-3 rounded-none px-3 py-3 text-sm text-black transition-colors duration-200 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    svg={() => <GearIcon className="icon-md" />}
                    text={localize('com_nav_settings')}
                    clickHandler={() => setShowSettings(true)}
                  />
                </Menu.Item>
                <div className="my-1 h-px bg-black/20 dark:bg-white/20" role="none" />
                <Menu.Item as="div">
                  <Logout />
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
      {showExports && (
        <ExportModal open={showExports} onOpenChange={setShowExports} conversation={conversation} />
      )}
      {showFiles && <FilesView open={showFiles} onOpenChange={setShowFiles} />}
      {showSettings && <Settings open={showSettings} onOpenChange={setShowSettings} />}
      {showInformation && <Information open={showInformation} onOpenChange={setShowInformation} />}
      {showPricing && <Pricing open={showPricing} onOpenChange={setShowPricing} />}
    </>
  );
}

export default memo(NavLinks);
